/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'ko',
        'Magento_Checkout/js/view/payment/default',
        'Mozg_Itau/js/action/set-payment-method',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function (ko, Component, setPaymentMethodAction, additionalValidators) {
        'use strict';
        var brandCode = ko.observable(null);
        var paymentMethod = ko.observable(null);

        return Component.extend({
            self: this,
            defaults: {
                template: 'Mozg_Itau/payment/pos-form',
                brandCode: ''
            },
            initObservable: function () {
                this._super()
                    .observe([
                    ]);
                return this;
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
            showLogo: function() {
                return window.checkoutConfig.payment.mozgItau.showLogo;
            },
            validate: function () {
                return true;
            }
        });
    }
);
