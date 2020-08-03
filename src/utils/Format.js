import BN from 'bn.js';
export function parseAmount(amount = "1", decimal = 9) {
    if (!amount) return "0"

    amount = cleanupAmount(amount);

    const split = amount.split('.');
    const wholePart = split[0];
    const fracPart = split[1] || '';
    if (split.length > 2 || fracPart.length > decimal) {
        throw new Error(`Cannot parse '${amount}' as bignumber`);
    }
    return trimLeadingZeroes(wholePart + fracPart.padEnd(decimal, '0'));
}
export function formatAmount(balance, decimal = 9, trimTrailingZeroes = false) {
    const balanceBN = new BN(balance, 10);
    balance = balanceBN.toString();
    const wholeStr = balance.substring(0, balance.length - decimal) || '0';
    const fractionStr = balance.substring(balance.length - decimal)
        .padStart(decimal, '0').substring(0, decimal);
    const result = `${wholeStr}.${fractionStr}`;
    return trimTrailingZeroes ? trimTrailingZeroes(result) : result;
}
/**
 * Removes commas from the input
 * @param amount A value or amount that may contain commas
 * @returns string The cleaned value
 */
function cleanupAmount(amount) {
    return amount.replace(/,/g, '').trim();
}
/**
 * Removes .000… from an input
 * @param value A value that may contain trailing zeroes in the decimals place
 * @returns string The value without the trailing zeros
 */
function trimTrailingZeroes(value) {
    return value.replace(/\.?0*$/, '');
}
/**
 * Removes leading zeroes from an input
 * @param value A value that may contain leading zeroes
 * @returns string The value without the leading zeroes
 */
function trimLeadingZeroes(value) {
    value = value.replace(/^0+/, '');
    if (value === '') {
        return '0';
    }
    return value;
}