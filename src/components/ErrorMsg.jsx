export default function ErrorMsg({errorObj}) {
    let errorStr = ""
    if(errorObj.code === "ERR_NETWORK"){
        errorStr = "It seems we've run into a network error. Please check your connection"
    }
    else {
        errorStr = `It seems we've run into an error "${errorObj.response.status}: ${errorObj.response.data.msg}". Please check that the URL`
    }
  return (
    <p className="error-msg">Whoopsie! {errorStr}</p>
  );
}
