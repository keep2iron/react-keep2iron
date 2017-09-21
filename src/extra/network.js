

export function http_get(url,params,callback,errorCallback){
    if(url == null)
        throw "url不能为空";


    if(params != null){
        for(let key in params){
            if(url.indexOf("?") === -1){
                url = url + ('?');
            }
            url = url + key + "=" + params[key] + "&";
        }
        url = url.substring(0,url.length - 1);
    }

    console.log(url);

    if(params != null){
        fetch(url,{
            method: "GET",
            mode: "cors",})
            .then((response)=>{
                if(response.ok)
                    return response.json();
            })
            .then((resp)=>{
                if(callback != null)
                    callback(resp);
            })
            .catch((e)=>{
                if(errorCallback != null)
                    errorCallback(e);
            });
    }
}