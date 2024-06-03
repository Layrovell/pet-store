export const firstUpperLetter = (str: string) => {
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const splitBeforeUppercase = (str: string) => {
  let formattedStr = str.replace(/([A-Z])/g, ' $1').trim();

  let words = formattedStr.split(' ');

  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }

  return words.join(' ');
}