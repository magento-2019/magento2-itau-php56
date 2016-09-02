/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */
define(
    [
        'jquery',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/url-builder',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/full-screen-loader'
    ],
    function ($, quote, urlBuilder, storage, errorProcessor, customer, fullScreenLoader) {
        'use strict';
        var agreementsConfig = window.checkoutConfig.checkoutAgreements;

        return function () {

            var serviceUrl,
                payload,
                paymentData = quote.paymentMethod();


            // check if agreement is enabled if so add it to payload
            if (agreementsConfig.isEnabled) {
                var agreementForm = $('.payment-method._active form[data-role=checkout-agreements]'),
                    agreementData = agreementForm.serializeArray(),
                    agreementIds = [];

                agreementData.forEach(function(item) {
                    agreementIds.push(item.value);
                });

                paymentData.extension_attributes = {agreement_ids: agreementIds};
            }


            /** Checkout for guest and registered customer. */
            if (!customer.isLoggedIn()) {
                serviceUrl = urlBuilder.createUrl('/guest-carts/:quoteId/payment-information', {
                    quoteId: quote.getQuoteId()
                });
                payload = {
                    cartId: quote.getQuoteId(),
                    email: quote.guestEmail,
                    paymentMethod: paymentData,
                    billingAddress: quote.billingAddress()
                };
            } else {
                serviceUrl = urlBuilder.createUrl('/carts/mine/payment-information', {});
                payload = {
                    cartId: quote.getQuoteId(),
                    paymentMethod: paymentData,
                    billingAddress: quote.billingAddress()
                };
            }


            fullScreenLoader.startLoader();

            return storage.post(
                serviceUrl, JSON.stringify(payload)
            ).done(
                function () {
                    $.mage.redirect(window.checkoutConfig.payment[quote.paymentMethod().method].redirectUrl);
                }
            ).fail(
                function (response) {
                    errorProcessor.process(response);
                    fullScreenLoader.stopLoader();
                }
            );
        };
    }
);
