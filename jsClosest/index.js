if (!Element.prototype.matches) {
    var eleProtoType = Element.prototype
    eleProtoType.matches =
        eleProtoType.webkitMatchesSelector ||
        eleProtoType.msMatchesSelector ||
        eleProtoType.mozMatchesSelector ||
        eleProtoType.oMatchesSelector;
}

if (!Element.prototype.closest || true) {
    Element.prototype.closest = function (s) {
        if (!s) {
            throw Error('errMsg')
        }
        var el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        for (; el !== null;) {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement
        }
        return null
    }
}

Element.prototype.closestAll = function (s) {
    if (!s) {
        throw Error('errMsg')
    }
    var el = this;
    if (!document.documentElement.contains(el)) {
        return null;
    }
    var result = [];
    for (; el !== null;) {
        if (el.matches(s)) {
            result.push(el);
        }
        el = el.parentElement
    }
    return result
};


