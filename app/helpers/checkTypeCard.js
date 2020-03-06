//refer https://www.regular-expressions.info/creditcard.html
//refer https://www.getnewidentity.com/unionpay-credit-card.php

exports.checkTypeCard = (cc0104, cc1316) => {
    if ( /^4\d{3}$/.test(cc0104) ) {
        return 'Visa'
    } else if ( /^5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720$/.test(cc0104) ) {
        return 'MasterCard'
    } else if (  /^3[47][0-9]{2}$/.test(cc0104) ) {
        return 'American Express'
    } else if ( /^6(?:011|5[0-9]{2})$/.test(cc0104) ) {
        return 'Discover';
    } else if ( /^62\d{2}$/.test(cc0104) ) {
        return 'UnionPay';
    } else if ( /^2131|1800|35\d{2}$/.test(cc0104) ) {
        return 'JCB';
    }
    return false
}