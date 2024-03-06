import * as ll from "./linked-list.js";

class HashMap {
    constructor(capacityLimit=100){
        this.capacityInUse = 0;
        this.capacityLimit = capacityLimit;
        this.loadFactorLimit = (75/100) * capacityLimit; 
        this.buckets = new Array(capacityLimit);
    }
    
    hash(key){
        let hashCode = 0;

        for(let i = 0; i < key.length; i++){
            hashCode += key.charCodeAt(i) * 31^(key.length - i);
        }

        return hashCode % this.capacityLimit;
    }

    grow(){
        if(this.loadFactorLimit == this.capacityInUse || true){
            let newBuckets = new Array(100);
            this.buckets = this.buckets.concat(newBuckets);
            this.capacityLimit = this.buckets.length; 
            this.loadFactorLimit = (75/100) * this.capacityLimit;

            return;
        }
    }

    set(key, value){
        const hashIndex = this.hash(key);
        
        // such index was empty        
        if(!this.buckets[hashIndex]){
            let headNode = new ll.Node({key, value}, null);
            let linkedList = new ll.LinkedList(headNode);

            this.buckets[hashIndex] = linkedList;
            this.capacityInUse++;
            
        } else {
        // collision: index was not empty
        // if it already exist set new value
        // else create new node

            // determine if it is an update or a new key
            let currentNode = this.buckets[hashIndex].head;
            while(currentNode){
                // it is an update;
                if(currentNode.value.key == key){
                    currentNode.value.value = value;
                    return;
                }
                currentNode = currentNode.next;
            }

                // it is a new key
            this.buckets[hashIndex].prepend({key, value});
            return;
        }
    }

    get(key){
        let keyHash = this.hash(key);

        // only one node
        let ll = this.buckets[keyHash];

        if(ll.head.next == null){
            return ll.head.value.value;
        } else {
        // more than one node
            let currentNode = ll.head;

            while(currentNode){
                if(currentNode.value.key == key){
                    return currentNode.value.value;
                }

                currentNode = currentNode.next;
            }

            return false;
        }
    }

    has(key){
        let keyHash = this.hash(key);

        if(this.buckets[keyHash]){
            return true;
        }

        return false;
    }

    remove(key){
        if(this.has(key)){
            let keyHash = this.hash(key);

            if(this.buckets[keyHash]){
                delete this.buckets[keyHash];
                this.capacityInUse--;
                return true;
            }
        } else {
            return false;
        }
    }

    length(){
        let length = 0;

        for(let linkedList in this.buckets){
            length++;
        }

        return length;
    }

    clear(){
        for(let key in this.buckets){
            if(this.buckets[key]){
                delete this.buckets[key];
            }
        }
    }

    keys(){
        let arr = [];

        for(let ll in this.buckets){
            // one node
            if(this.buckets[ll].head.next == null){
                arr.push(this.buckets[ll].head.value.key);
            } else {
            // multiples nodes
                let subArr = [];
                let currentNode = this.buckets[ll].head;

                while(currentNode){
                    subArr.push( currentNode.value.key );
                    currentNode = currentNode.next;
                }

                arr.push(subArr);
            }
        }

        return arr;
    }

    values(){
        let arr = [];

        for(let ll in this.buckets){
            // one node
            if(this.buckets[ll].head.next == null){
                arr.push(this.buckets[ll].head.value.value);
            } else {
            // multiples nodes
                let subArr = [];
                let currentNode = this.buckets[ll].head;

                while(currentNode){
                    subArr.push( currentNode.value.value );
                    currentNode = currentNode.next;
                }

                arr.push(subArr);
            }
        }

        return arr;
    }

    entries(){
        let arr = [];

        for(let ll in this.buckets){
            // one node
            if(this.buckets[ll].head.next == null){
                arr.push(this.buckets[ll].head.value);
            } else {
            // multiples nodes
                let subArr = [];
                let currentNode = this.buckets[ll].head;

                while(currentNode){
                    subArr.push( currentNode.value);
                    currentNode = currentNode.next;
                }

                arr.push(subArr);
            }
        }

        return arr;
    }
}


let drHashMap = new HashMap(100);
drHashMap.set("pistolero", "holaaaaaa");
drHashMap.set("pistolero", "oioioi");
drHashMap.set("king", "Mystery of the wosarm");
drHashMap.set("ivoox", "Mystery of the worm");
//console.log(drHashMap.get("king"));
drHashMap.grow()
console.log(drHashMap.entries(), 'grow');