import { FontStyle } from './types';

export const FONT_STYLES: FontStyle[] = [
    { id: 'thanhxuan', name: 'Thanh Xuân', fontHead: 'font-script', nameHead: 'Great Vibes', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-sans-human', isScript: true, subCase: 'uppercase tracking-widest', desc: 'Soft, dreamy, elegant' },
    { id: 'quocdan', name: 'Modern UI', fontHead: 'font-sans-human', nameHead: 'Be Vietnam Pro', fontSub: 'font-sans-human', nameSub: 'Be Vietnam Pro', fontBody: 'font-sans-human', isScript: false, subCase: 'uppercase tracking-wide', desc: 'Clean, corporate, clear' },
    { id: 'tapchi', name: 'Magazine', fontHead: 'font-serif-display', nameHead: 'Prata', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-serif-text', isScript: false, subCase: 'italic tracking-wide', desc: 'Luxury, fashion, serif' },
    { id: 'ngonghinh', name: 'Playful', fontHead: 'font-hand', nameHead: 'Patrick Hand', fontSub: 'font-hand', nameSub: 'Patrick Hand', fontBody: 'font-sans-human', isScript: false, subCase: 'lowercase tracking-wide', desc: 'Fun, friendly, hand-drawn' },
    { id: 'poster', name: 'Blockbuster', fontHead: 'font-poster', nameHead: 'Anton', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-sans-human', isScript: false, subCase: 'uppercase tracking-tighter', desc: 'Strong, impactful, bold', headCase: 'uppercase' },
    { id: 'tho', name: 'Poetic', fontHead: 'font-serif-text', nameHead: 'Playfair', fontSub: 'font-script', nameSub: 'Great Vibes', fontBody: 'font-serif-text', isScript: true, subCase: 'normal-case text-lg', desc: 'Classic, romantic' }
];

export const INITIAL_COLOR = "#3282E3";

export const INITIAL_CONTENT = {
    heading: "Thanh Xuân",
    sub: "Như một chén trà",
    body: "Uống vào một phát hết bà thanh xuân. Time flies like an arrow; fruit flies like a banana."
};
