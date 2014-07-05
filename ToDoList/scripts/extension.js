
Date.prototype.toShortString = function () {
    return this.getDate() + "/" + (this.getMonth() +1) + "/" + this.getFullYear();
};