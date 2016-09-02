/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint browser:true jquery:true*/
/*global alert*/
var config = {
    paths: {
        'mozg/encrypt' : 'Mozg_Itau/js/view/payment/mozg.encrypt.min'
    },
    config: {
        mixins: {
            'Mozg_Itau/js/action/place-order': {
                'Magento_CheckoutAgreements/js/model/place-order-mixin': true
            }
        }
    }
};
