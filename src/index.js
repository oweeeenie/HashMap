import './styles.css';

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
    let hashCode = hash(key);
    hashCode = hashCode % this.capacity;

    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = [];
      this.buckets[hashCode].push({ key, value });
    }
  }
}
