import Style from "../loading/loading.module.css";

const Loading = () => {

    return(
        <div className={Style.All}>
      <div className={Style.newtons_cradle}>
      <div className={Style.newtons_cradle__dot}></div>
      <div className={Style.newtons_cradle__dot}></div>
      <div className={Style.newtons_cradle__dot}></div>
      <div className={Style.newtons_cradle__dot}></div>
      
      </div></div>
    );


};

export default Loading;