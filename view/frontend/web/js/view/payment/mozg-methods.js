/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'mozg_itau_oneclick',
                component: 'Mozg_Itau/js/view/payment/method-renderer/mozg-itau-oneclick-method'
            },
            {
                type: 'mozg_itau_cc',
                component: 'Mozg_Itau/js/view/payment/method-renderer/mozg-itau-cc-method'
            },
            {
                type: 'mozg_itau_hpp',
                component: 'Mozg_Itau/js/view/payment/method-renderer/mozg-itau-hpp-method'
            },
            {
                type: 'mozg_itau_sepa',
                component: 'Mozg_Itau/js/view/payment/method-renderer/mozg-itau-sepa-method'
            },
            {
                type: 'mozg_itau_pos',
                component: 'Mozg_Itau/js/view/payment/method-renderer/mozg-itau-pos-method'
            }
        );
        /** Add view logic here if needed */
        return Component.extend({});
    }
);