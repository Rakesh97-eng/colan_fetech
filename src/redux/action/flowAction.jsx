// import { async } from "q";
// import { APIService } from "../Api/APIService";

// export function getMyAdminDetailsApi() {
//     return async (dispatch) => {
//       dispatch(getMyAdminDetailReducer({ isLoading: true }));
//       APIService("GET","/getAdminDetails")
//         .then((e) => {
//           dispatch(
//             getMyAdminDetailReducer({
//               adminDetail: e.data,
//               isLoading: false,
//             })
//           );
//         })
//         .catch((e) => {
//           console.log(e);
//           dispatch(getMyAdminDetailReducer({ isLoading: false }));
//     });
//   };
// }

// export function addSubAmdinsApi(){
//   return async (dispatch)=>{
//     dispatch(addSubAmdinsReducer({ isLoading: true }));
//     APIService("POST",'/managedata')
//     .then((e)=>{
//       dispatch(
//         addSubAmdinsReducer({
//           subAdmimDetail:e.data,
//           isLoading:false
//         })
//       )
//     })
//     .catch((e) => {
//       dispatch(addSubAmdinsReducer({ isLoading: false }));
// })
//   }
// }