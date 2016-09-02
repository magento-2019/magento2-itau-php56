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
        'Magento_Checkout/js/model/payment/additional-validators',
        'Magento_Customer/js/model/customer',
        'mozg/encrypt'
    ],
    function (_, $, Component, placeOrderAction, $t, additionalValidators, customer, mozgEncrypt) {

        'use strict';
        return Component.extend({
            defaults: {
                template: 'Mozg_Itau/payment/cc-form',
                creditCardOwner: '',
                encryptedData: '',
                setStoreCc: true
            },
            initObservable: function () {
                this._super()
                    .observe([
                        'creditCardType',
                        'creditCardExpYear',
                        'creditCardExpMonth',
                        'creditCardNumber',
                        'creditCardVerificationNumber',
                        'creditCardSsStartMonth',
                        'creditCardSsStartYear',
                        'selectedCardType',
                        'creditCardOwner',
                        'encryptedData',
                        'generationtime',
                        'setStoreCc'
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
                return 'mozg_itau_cc';
            },
            getData: function() {
                return {
                    'method': this.item.method,
                    additional_data: {
                        'cc_type': this.creditCardType(),
                        'encrypted_data': this.encryptedData(),
                        'generationtime': this.generationtime(),
                        'store_cc': this.setStoreCc()
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

                console.info('mozg:debug');
                console.log(this);

                /*

                var cse_key = this.getCSEKey();
                var options = {};

                var cseInstance = mozgEncrypt.createEncryption(cse_key, options);
                var generationtime = self.getGenerationTime();

                var cardData = {
                    number : self.creditCardNumber(),
                    cvc : self.creditCardVerificationNumber(),
                    holderName : self.creditCardOwner(),
                    expiryMonth : self.creditCardExpMonth(),
                    expiryYear : self.creditCardExpYear(),
                    generationtime : generationtime
                };

                var data = cseInstance.encrypt(cardData);
                self.encryptedData(data);

                */

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
            isCseEnabled: function() {
                return window.checkoutConfig.payment.mozgItauCc.cseEnabled;
            },
            getCSEKey: function() {
                return window.checkoutConfig.payment.mozgItauCc.cseKey;
            },
            getGenerationTime: function() {
                return window.checkoutConfig.payment.mozgItauCc.generationTime;
            },
            canCreateBillingAgreement: function() {
                if(customer.isLoggedIn()) {
                    return window.checkoutConfig.payment.mozgItauCc.canCreateBillingAgreement;
                }
                return false;
            },
            isShowLegend: function() {
                return true;
            },
            validate: function () {
                var form = 'form[data-role=mozg-itau-cc-form]';

                var validate =  $(form).validation() && $(form).validation('isValid');
                // add extra validation because jqeury validation will not work on non name attributes
                var ccNumber = Boolean($(form + ' #mozg_itau_cc_cc_number').valid());
                var owner = Boolean($(form + ' #mozg_itau_cc_cc_owner').valid());
                var expiration = Boolean($(form + ' #mozg_itau_cc_expiration').valid());
                var expiration_yr = Boolean($(form + ' #mozg_itau_cc_expiration_yr').valid());
                var cid = Boolean($(form + ' #mozg_itau_cc_cc_cid').valid());

                if(!validate || !ccNumber || !owner || !expiration || !expiration_yr || !cid) {
                    return false;
                }

                return true;
            },
            showLogo: function() {
                return window.checkoutConfig.payment.mozgItau.showLogo;
            },
            getIcons: function (type) {
                return window.checkoutConfig.payment.mozgItauCc.icons.hasOwnProperty(type)
                    ? window.checkoutConfig.payment.mozgItauCc.icons[type]
                    : false
            },
        });
    }
);


