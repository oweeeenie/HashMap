class HashMap {
  constructor(capacity, loadFactor) {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    hashCode = Math.abs(hashCode) % this.capacity; // hashcode POSITIVE ALWAYS

    if (!this.buckets[hashCode]) {
      // checks if the array index is already taken
      this.buckets[hashCode] = [];
    }

    let keyFound = false;

    for (let i = 0; i < this.buckets[hashCode].length; i++) {
      if (this.buckets[hashCode][i].key === key) {
        this.buckets[hashCode][i].value = value;
        keyFound = true;
        break;
      }
    }

    if (!keyFound) {
      this.buckets[hashCode].push({ key, value });
    }
  }

  get(key) {
    let hashCode = this.hash(key);
    hashCode = Math.abs(hashCode) % this.capacity;
    if (!this.buckets[hashCode]) {
      return undefined;
    }

    for (let i = 0; i < this.buckets[hashCode].length; i++) {
      if (key === this.buckets[hashCode][i].key) {
        return this.buckets[hashCode][i].value;
      }
    }
    return undefined;
  }

  has(key) {
    let hashCode = this.hash(key);
    hashCode = Math.abs(hashCode) % this.capacity;

    if (!this.buckets[hashCode]) {
      return false;
    }

    for (let i = 0; i < this.buckets[hashCode].length; i++) {
      if (key === this.buckets[hashCode][i].key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let hashCode = this.hash(key);
    hashCode = Math.abs(hashCode) % this.capacity;

    if (!this.buckets[hashCode]) {
      return false;
    }

    for (let i = 0; i < this.buckets[hashCode].length; i++) {
      if (key === this.buckets[hashCode][i].key) {
        this.buckets[hashCode].splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

const hashmap = new HashMap();

hashmap.set('a', 1);
hashmap.set('b', 2);
hashmap.set('c', 3);

console.log(hashmap.get('a')); // should print: 1
console.log(hashmap.get('b')); // should print: 2
console.log(hashmap.get('c')); // should print: 3

// Remove a key that exists
console.log(hashmap.remove('b')); // should print: true
console.log(hashmap.get('b')); // should print: undefined (because 'b' was removed)

// Try to remove a key that doesn't exist
console.log(hashmap.remove('z')); // should print: false
console.log(hashmap.get('z')); // should print: undefined (because 'z' was never added)

console.log(hashmap.get('a')); // should still print: 1
console.log(hashmap.get('c')); // should still print: 3
