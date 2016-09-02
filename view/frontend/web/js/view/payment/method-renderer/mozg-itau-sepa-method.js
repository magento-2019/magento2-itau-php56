/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'underscore',
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Mozg_Itau/js/action/place-order',
        'mage/translate',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function (_, $, Component, placeOrderAction, $t, additionalValidators) {
        'use strict';
        return Component.extend({
            self: this,
            defaults: {
                template: 'Mozg_Itau/payment/sepa-form'
            },
            initObservable: function () {
                this._super()
                    .observe([
                        'accountName',
                        'iban',
                        'country',
                        'setAcceptSepa'
                    ]);
                return this;
            },
            setPlaceOrderHandler: function(handler) {
                this.placeOrderHandler = handler;
            },
            setValidateHandler: function(handler) {
                this.validateHandler = handler;
            },
            getCode: function() {
                return 'mozg_itau_sepa';
            },
            getData: function() {
                return {
                    'method': this.item.method,
                    'additional_data': {
                        'account_name': this.accountName(),
                        'iban': this.iban(),
                        'country': this.country(),
                        'accept_sepa': this.setAcceptSepa()
                    }
                };
            },
            isActive: function() {
                return true;
            },
            /**
             * @override
             */
            placeOrder: function(data, event) {
                var self = this,
                    placeOrder;

                if (event) {
                    event.preventDefault();
                }

                if (this.validate() && additionalValidators.validate()) {
                    this.isPlaceOrderActionAllowed(false);
                    placeOrder = placeOrderAction(this.getData(), this.redirectAfterPlaceOrder);

                    $.when(placeOrder).fail(function(response) {
                        self.isPlaceOrderActionAllowed(true);
                    });
                    return true;
                }
                return false;
            },
            getControllerName: function() {
                return window.checkoutConfig.payment.iframe.controllerName[this.getCode()];
            },
            getPlaceOrderUrl: function() {
                return window.checkoutConfig.payment.iframe.placeOrderUrl[this.getCode()];
            },
            context: function() {
                return this;
            },
            validate: function () {
                var form = 'form[data-role=mozg-itau-sepa-form]';

                var validate =  $(form).validation() && $(form).validation('isValid');

                if(!validate) {
                    return false;
                }

                return true;
            },
            showLogo: function() {
                return window.checkoutConfig.payment.mozgItau.showLogo;
            },
            getCountries: function() {
                return _.map(window.checkoutConfig.payment.mozgItauSepa.countries, function(value, key) {
                    return {
                        'key': key,
                        'value': value
                    }
                });
            }
        });
    }
);
