const readline = require('readline');
const AVLTree = require('./AVLTree');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tree = new AVLTree();

function app() {
    rl.question('1. Enter the number of items in the sequence: ', (n) => { //Введите количество элементов в последовательности:
        console.log('\n2.Enter the elements: '); //Введите элементы:
        let count = 0;
        const inputElements = () => {
            rl.question('', (value) => {
                tree.insert(parseInt(value));
                count++;
                if (count < n) {
                    inputElements();
                } else {
                    console.log('\n3. Passing through the order of the AVL tree: '); //Проход по порядку дерева AVL:
                    tree.display();
                    searchNumber();
                }
            });
        };
        inputElements();
    });
}

function searchNumber() {
    rl.question('\n4. Enter the number you want to find:', (value) => { //Введите номер, которое хотите найти:
        console.log(tree.search(parseInt(value)) ? '4.1. It was found' : '4.1. Unfortunately, it was not found'); //Нашлось / К сожалению не нашлось
        removeNumber();
    });
}

function removeNumber() {
    rl.question('\n5. Enter the number you want to delete: ', (value) => { //Введите номер, которое хотите удалить
        if (!tree.search(parseInt(value))) {
            console.log('6. Unfortunately, it was not found'); //К сожалению не нашлось
        } else {
            tree.remove(parseInt(value));
            tree.display();
            setTimeout(() => {
                rl.close();
            }, 5000);
        }
    });
}

app();