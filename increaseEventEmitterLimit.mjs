// increase the event emitter limit
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 1000000;

// process
process.setMaxListeners(1000000);
