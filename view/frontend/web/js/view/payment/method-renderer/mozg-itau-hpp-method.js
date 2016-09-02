/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'ko',
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Mozg_Itau/js/action/set-payment-method',
        'Magento_Checkout/js/action/select-payment-method',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/payment/additional-validators',
        'mage/storage',
        'Magento_Checkout/js/model/url-builder',
        'Mozg_Itau/js/model/mozg-payment-service',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/full-screen-loader'
    ],
    function (ko, $, Component, setPaymentMethodAction, selectPaymentMethodAction, quote, checkoutData, additionalValidators, storage, urlBuilder, mozgPaymentService, customer, fullScreenLoader) {
        'use strict';
        var brandCode = ko.observable(null);
        var paymentMethod = ko.observable(null);

        return Component.extend({
            self: this,
            defaults: {
                template: 'Mozg_Itau/payment/hpp-form',
                brandCode: ''
            },
            initObservable: function () {
                this._super()
                    .observe([
                        'brandCode',
                        'issuerId'
                    ]);
                return this;
            },
            initialize: function () {
                this._super();

                fullScreenLoader.startLoader();

                // reset variable:
                mozgPaymentService.setPaymentMethods();

                // retrieve payment methods
                var serviceUrl,
                    payload;

                if(customer.isLoggedIn()) {
                    serviceUrl = urlBuilder.createUrl('/carts/mine/retrieve-mozg-payment-methods', {});
                } else {
                    serviceUrl = urlBuilder.createUrl('/guest-carts/:cartId/retrieve-mozg-payment-methods', {
                        cartId: quote.getQuoteId()
                    });
                }

                payload = {
                    cartId: quote.getQuoteId(),
                    shippingAddress: quote.shippingAddress()
                };

                storage.post(
                    serviceUrl, JSON.stringify(payload)
                ).done(
                    function (response) {
                        mozgPaymentService.setPaymentMethods(response);
                        fullScreenLoader.stopLoader();
                    }
                ).fail(function(error) {
                    console.log(JSON.stringify(error));
                    fullScreenLoader.stopLoader();
                });
            },
            getMozgHppPaymentMethods: function() {
                var self = this;

                var paymentMethods = mozgPaymentService.getAvailablePaymentMethods();

                var paymentList = _.map(paymentMethods, function(value) {

                        if(value.brandCode == "ideal") {
                            return {
                                'value': value.brandCode,
                                'name': value,
                                'method': self.item.method,
                                'issuerIds':  value.issuers,
                                'issuerId': ko.observable(null),
                                getCode: function() {
                                    return self.item.method;
                                },
                                validate: function () {
                                    return self.validate();
                                }
                            }
                        } else {
                            return {
                                'value': value.brandCode,
                                'name': value,
                                'method': self.item.method,
                                getCode: function() {
                                    return self.item.method;
                                },
                                validate: function () {
                                    return self.validate();
                                }
                            }
                        }
                    }
                );
                return paymentList;
            },
            /** Redirect to mozg */
            continueToMozg: function () {
                if (this.validate() && additionalValidators.validate()) {
                    //update payment method information if additional data was changed
                    this.selectPaymentMethod();
                    setPaymentMethodAction();
                    return false;
                }
            },
            continueToMozgBrandCode: function() {
                // set payment method to mozg_itau_hpp
                var self = this;

                if (this.validate() && additionalValidators.validate()) {

                    // for ideal add brand_code in request
                    if(brandCode() == "ideal") {
                        var  data = {
                            "method": self.method,
                            "po_number": null,
                            "additional_data": {
                                issuer_id: this.issuerId(),
                                brand_code: self.value
                            }
                        };
                    } else {
                        var  data = {
                            "method": self.method,
                            "po_number": null,
                            "additional_data": {
                                brand_code: self.value
                            }
                        };
                    }

                    selectPaymentMethodAction(data);
                    setPaymentMethodAction();
                }

                return false;
            },
            selectPaymentMethodBrandCode: function() {
                var self = this;

                // set payment method to mozg_itau_hpp
                var  data = {
                    "method": self.method,
                    "po_number": null,
                    "additional_data": {
                        brand_code: self.value,
                    }
                };

                // set the brandCode
                brandCode(self.value);

                // set payment method
                paymentMethod(self.method);

                selectPaymentMethodAction(data);
                checkoutData.setSelectedPaymentMethod(self.method);

                return true;
            },
            isBrandCodeChecked: ko.computed(function () {

                if(!quote.paymentMethod()) {
                  return null;
                }

                if(quote.paymentMethod().method == paymentMethod()) {
                    return brandCode();
                }
                return null;
            }),
            isPaymentMethodSelectionOnMozg: function() {
                return window.checkoutConfig.payment.mozgItauHpp.isPaymentMethodSelectionOnMozg;
            },
            validate: function () {
                return true;
            }
        });
    }
);
