class Utils{

  static async asyncFilter(arr, predicateFunction){
    return arr.reduce(async(memo, e)=>{
      const result = await predicateFunction(e);
      let res;
      if(result){
        res = await memo;
        return [...res, e]
      }
      else{
        return memo;
      }
    },[]);
  }

}

module.exports = Utils;