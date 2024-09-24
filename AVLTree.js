const AVLNode = require('./AVLNode');

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    balanceFactor(node) {
        return this.height(node.left) - this.height(node.right);
    }

    updateHeight(node) {
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    rotateRight(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    rotateLeft(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (!node) return new AVLNode(value);
        if (value < node.value) node.left = this._insert(node.left, value);
        else if (value > node.value) node.right = this._insert(node.right, value);
        else return node;

        this.updateHeight(node);
        let balance = this.balanceFactor(node);

        if (balance > 1) {
            if (value < node.left.value) return this.rotateRight(node);
            else {
                node.left = this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        }
        if (balance < -1) {
            if (value > node.right.value) return this.rotateLeft(node);
            else {
                node.right = this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }
        return node;
    }

    search(value) {
        return this._search(this.root, value);
    }

    _search(node, value) {
        if (!node) return false;
        if (value === node.value) return true;
        if (value < node.value) return this._search(node.left, value);
        return this._search(node.right, value);
    }

    remove(value) {
        this.root = this._remove(this.root, value);
    }

    _remove(node, value) {
        if (!node) return node;
        if (value < node.value) node.left = this._remove(node.left, value);
        else if (value > node.value) node.right = this._remove(node.right, value);
        else {
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                let temp = this.minValueNode(node.right);
                node.value = temp.value;
                node.right = this._remove(node.right, temp.value);
            }
        }
        if (!node) return node;
        this.updateHeight(node);
        let balance = this.balanceFactor(node);
        if (balance > 1) {
            if (this.balanceFactor(node.left) >= 0) return this.rotateRight(node);
            else {
                node.left = this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        }
        if (balance < -1) {
            if (this.balanceFactor(node.right) <= 0) return this.rotateLeft(node);
            else {
                node.right = this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }
        return node;
    }

    minValueNode(node) {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }

    display() {
        const values = [];
        this._display(this.root, values);
        console.log(values.join(' '));
    }

    _display(node, values) {
        if (node) {
            this._display(node.left, values);
            values.push(node.value);
            this._display(node.right, values);
        }
    }
}

module.exports = AVLTree;