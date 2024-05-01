export const createEvent=async (data)=>{
    const apiUrl="http://localhost:5000/events/"
    const response=await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result=await response.json()
      console.log(result);
}