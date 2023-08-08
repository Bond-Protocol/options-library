import { Buffer } from 'buffer';
import process from 'process';

// @ts-ignore
window.global = window;
window.process = process;
// @ts-ignore
window.Buffer = Buffer;
