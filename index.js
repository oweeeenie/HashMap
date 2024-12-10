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

  length() {
    let keyCount = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        keyCount = keyCount + this.buckets[i].length;
      }
    }
    return keyCount;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  keys() {
    let collectedKeys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        collectedKeys.push(this.buckets[i][j].key);
      }
    }
    return collectedKeys;
  }
}
