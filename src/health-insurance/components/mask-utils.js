export const cpfMask = (value) => {
    return value
        .replace(/\D/g, "") // remove any character without number
        .replace(/(\d{3})(\d)/, "$1.$2") // captures 2 groups of number the first of 3 and the second of 1, after capturing the first group it adds a point before the second group of number
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captures 2 numbers followed by "-" and leaves nothing to be typed
};

export const unmask = (name, value) => {
    value = value || "";

    switch (name) {
        case "name":
            return value.replace(/\d+/g, "");
        case "cpf":
            return value.replace(/\./g, "").replace(/\-/g, "").substr(0, 11);
        case "postalCode":
        case "zipcode":
            return value.replace(/\-/g, "").substr(0, 8);
        case "card_expiration_date":
            return value.replace(/\//g, "").substr(0, 4);
        case "card_cvv":
            return value.replace(/\//g, "").substr(0, 3);
        case "phone":
            value = value
                .replace(/\)/g, "")
                .replace(/\(/g, "")
                .replace(/\-/g, "");
            if (value.length > 10) {
                value = value.substr(0, 12);
            }
            return value;
        case "card_number":
            value = value.replace(/ /g, "");
            if (value.length > 16) {
                value = value.substr(0, 16);
            }
            return value;
        case "weight":
            // value = value.replace(/\D/g, "").replace(",", "");

            if (value.length >= 5) {
                value = value.slice(0, 5);
            }

            return value;
        case "height":
            value = value.replace(/\D/g, "").replace(",", "");

            if (value.length > 3 && value.length < 5) {
                value = [value.slice(0, 3), ".", value.slice(3)].join("");
                console.log(value);
            } else if (value.length >= 5) {
                value = [value.slice(0, 3), ".", value.slice(3)].join("");
            }

            return value;
        default:
            return value;
    }
};

export const dateMask = (value) => {
    return value
        .replace(/\D/g, "") // remove any character without number
        .replace(/(\d{2})(\d)/, "$1/$2") // captures 2 groups of number the first of 2, after capturing the first group it adds a"/" before the second group of number
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1"); // captures 2 numbers followed by "-" and leaves nothing to be typed
};

export const cardNumberMask = (value) => {
    return value
        .replace(/\D/g, "") // remove any character without number
        .replace(/(\d{4})(\d)/, "$1 $2") // captures 2 groups of number the first of 2, after capturing the first group it adds a"/" before the second group of number
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2");
};

export const phoneMask = (value) => {
    var r = value.replace(/\D/g, "");

    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    return r;
};

export const postalCodeMask = (value) => {
    return value
        .replace(/\D/g, "") // remove any character without number
        .replace(/(\d{5})(\d)/, "$1-$2") // captures 1 group of number the first of 5, after capturing the first group it adds a"-" before the second group of number
        .replace(/(-\d{3})\d+?$/, "$1"); // captures 3 numbers followed by "-" and leaves nothing to be typed
};

export const cardExpirationDateMask = (value) => {
    return value
        .replace(/\D/g, "") // remove any character without number
        .replace(/(\d{2})(\d)/, "$1/$2"); // captures 1 group of number the first of 5, after capturing the first group it adds a"-" before the second group of number
};

export const weightMask = (value) => {
    if (value.length > 2 && value.length <= 5) {
        return value
            .replace(/\D/g, "") // remove any character without number
    } else if (value.length > 5) {
        return value
            .replace(/\D/g, "") // remove any character without number
            .replace(/(\d{5})\d+?$/, "$1");
    }

    return value.replace(/\D/g, "");
};

export const weightAndHeightMask = (value) => {
    if (value.length > 3 && value.length <= 5) {
        return value
            .replace(/\D/g, "") // remove any character without number
            .replace(/(\d{3})(\d)/, "$1,$2") // captures 1 group of number the first of 5, after capturing the first group it adds a"-" before the second group of number
            .replace(/(,\d{2})\d+?$/, "$1");
    } else if (value.length > 5) {
        return value
            .replace(/\D/g, "") // remove any character without number
            .replace(/(\d{3})(\d)/, "$1,$2") // captures 1 group of number the first of 5, after capturing the first group it adds a"-" before the second group of number
            .replace(/(,\d{2})\d+?$/, "$1");
    }

    return value.replace(/\D/g, "");
};


