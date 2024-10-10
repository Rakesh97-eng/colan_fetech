export const usePassword = ()=>{
      const generatePassword = (name,phno)=>{
        let newname = name.split('').slice(0,5).join('')
        let newnum = phno.toString().split('').slice(0,5).join('')
        let newpassword = newname+"@"+newnum;
        return newpassword;
      }

       return generatePassword
}