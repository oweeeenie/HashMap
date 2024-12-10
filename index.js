import { validate } from 'webpack';
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
    let hashCode = this.hash(key);
    hashCode = hashCode % this.capacity;

    if (!this.buckets[hashCode]) {
      // checks if the array index is already taken
      this.buckets[hashCode] = [];
      this.buckets[hashCode].push({ key, value });
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
}

console.log('hi');
