class HashMap {
  constructor(capacity, loadFactor) {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  // takes a key as an arguement and generates a hashcode. (this code was provided, i DID NOT write this myself)
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  resize() {
    console.log('Resizing...'); // logs when i am resizing
    const newCapacity = this.capacity * 2; // doubles bucket size
    const newBuckets = new Array(newCapacity);

    // Rehash all existing entries into the new buckets
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          const { key, value } = this.buckets[i][j];
          let hashCode = this.hash(key);
          hashCode = Math.abs(hashCode) % newCapacity;

          if (!newBuckets[hashCode]) {
            newBuckets[hashCode] = [];
          }

          newBuckets[hashCode].push({ key, value });
        }
      }
    }

    // new array for new entries/buckets
    this.buckets = newBuckets;
    this.capacity = newCapacity;
    console.log('New capacity:', this.capacity);
  }

  // takes 2 arguements, key and value. actual assigns the key, and the value
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
      this.size++;
    }

    if (this.size / this.capacity > 0.75) {
      this.resize();
    }
  }

  // takes key as an arguement and returns the value assigned to the key
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

  // takes key as an arguement and will return true or false depending if the key entered matches one in the hashMap
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

  // takes key as an arguement and removes THAT entry. if it EXISTS
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

  // returns the length of the stored keys in the hashMap method
  length() {
    let keyCount = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        keyCount = keyCount + this.buckets[i].length;
      }
    }
    return keyCount;
  }

  // believe it or not, clears ALL entries in he hashMap method
  clear() {
    this.buckets = new Array(this.capacity);
  }

  // returns an array with all KEYS (not values)
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

  // returns an array with all VALUES (not keys)
  values() {
    let collectedValues = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        collectedValues.push(this.buckets[i][j].value);
      }
    }
    return collectedValues;
  }

  // returns the key and value AS A PAIR, together.
  entries() {
    let collectedEntries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        collectedEntries.push([
          this.buckets[i][j].key,
          this.buckets[i][j].value,
        ]);
      }
    }
    return collectedEntries;
  }
}
