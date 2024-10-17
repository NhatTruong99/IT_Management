// myMixin.js
export const myMixin = {
    methods: {
        isURL(text){
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(text);
        },
        formatDateString(timeStamp){    
            return new Date(timeStamp * 1000).toLocaleDateString("vi-VN");
        }
    }
};
  