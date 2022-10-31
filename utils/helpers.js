module.exports = {
  checkLike: (like, login) => {
    console.log(like, login);
    if (!like && login) {
      console.log("shsdhsdahsdh");
      return true;
    }else{
      return false;
    } 
  },
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() + 5
      }`;
  },
};



