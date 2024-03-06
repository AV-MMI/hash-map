export { Node, LinkedList}

class LinkedList {
    constructor(headNode){
        this.head = headNode;
        this.tail;
    }

    logNodes(){
        let currentNode = this.head;

        while(currentNode){
            console.log(currentNode, 'node log');
            currentNode = currentNode.next;
        }   
    }

    // adds a new node containing value to the end of the list
    append(value){
        let currentNode = this.head;
        let tailNode = null;
        let tmpNode = new Node(value, null);

        while(currentNode){
            tailNode = currentNode;
            currentNode = currentNode.next;
        }
        
        tailNode.next = tmpNode;
    }

    // adds a new node containing value to the start of the list
    prepend(value){
        let tmpNode = new Node(value, this.head);
        this.head = tmpNode;
    }
    
    size(){
        let size = 0;
        let currentNode = this.head;

        while(currentNode){
            currentNode = currentNode.next;
            size++;
        }

        return size;
    }

    head(){
        return this.head;
    }

    tail(){
        let tail = null;
        let currentNode = this.head;

        while(currentNode){
            tail = currentNode;
            currentNode = currentNode.next;
        }

        return tail;
    }

    at(index){
        let idx = 0;
        let currentNode = this.head;

        while(currentNode){
            if(idx == index){
                return currentNode;
            }

            idx++;
            currentNode = currentNode.next;
        }

        return null;
    }

    pop(){
        let preTail = this.at(this.size() - 1);
        preTail.next = null;
        console.log(preTail, 'pretail')
    }

    contains(value){
        let currentNode = this.head;

        while(currentNode){
            if(currentNode.value == value){
                return true;
            }

            currentNode = currentNode.next;
        }

        return false;
    }

    find(value){
        let currentNode = this.head;
        let idx = 0;
        while(currentNode){
            if(currentNode.value == value){
                return idx;
            }

            idx++;
            currentNode = currentNode.next;
        }
    }

    toString(){
        let output = "";
        let currentNode = this.head;
        let idx = 0;

        while(currentNode){
            output += `(${currentNode.value} - ${idx}) -> `;
            idx++;
            currentNode = currentNode.next;
        }

        output += "null";

        return output;
    }

    insertAt(value, index){
        if(index !== 0 && index < this.size()){
            let preNode = this.at(index - 1);
            let formerIdxNode = this.at(index);
            let newNode = new Node(value, formerIdxNode);
            preNode.next = newNode;
        }

        else if(index == 0){
            this.preprend(value);
        }

        else if(index == this.size){
            this.append(value);
        }
    }

    removeAt(index){
        if(index !== 0 && index < this.size()){
            let preNode = this.at(index - 1);
            let postNode = this.at(index + 1);
            
            preNode.next = postNode;
        }

        else if(index == 0){
            let secondNode = this.at( index + 1);

            this.head = secondNode;
        }

        else if(index == this.size()){
            let preNode = this.at( index - 1 );
            preNode.next = null;
        }
    }
}

class Node {
    constructor(value, next=null){
        this.value = value;
        this.next = next;
    }
}

let funkHead = new Node("funk", null);
let funkLL = new LinkedList(funkHead)
funkLL.prepend("Casanova");

funkLL.tail();
funkLL.append("cidade", null);
console.log(funkLL.size());
//console.log(funkLL.at(0))
funkLL.insertAt("medley",2)
console.log(funkLL.toString())
funkLL.removeAt(2);
console.log(funkLL.toString())
