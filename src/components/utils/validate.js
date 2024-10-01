/**
 * 校验是否是数字
 * @param value
 * @returns {boolean}
 */
export const isNumber = (value) => {
    const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
    return regex.test(value);
};
