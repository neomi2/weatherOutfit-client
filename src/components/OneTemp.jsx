export default function OneHourTemp({ hour, onClick,icon,backgroundColor  }) {
    
  return (
      <div
        style={{
          border: "2px solid rgb(173 194 255)",
          padding: "0px 0px 10px 0px",
          borderRadius: "12px",
          textAlign: "center",
          cursor: "pointer",
          width: "650px", 
          height:"88px",
          margin: "0px 0px 8px 425px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.19)",
        overflow: "hidden",
        }} 
        onClick={() => onClick(hour.temp)}
      >
      <div
        style={{
          height: "6px",
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      />
      <div style={{          display: "flex",
          flexDirection: "row",}}>
        <div style={{margin:"20px 300px 0px 30px",fontWeight: "bold", fontSize: "28px",color: backgroundColor}}> {hour.temp}° </div>
      <div style={{margin:"2px 10px 0px 100px",
          display: "flex",
          flexDirection:"column",
        }}>
    <div style={{
          display: "flex",
            flexDirection: "row",
        }}>
        <div style={{fontSize:"24px",margin:"8px 0px 0px 40px"}}>{icon}</div>
        <div style={{margin:"8px 0px 0px 10px",fontWeight: "bold", fontSize: "22px"}}> {hour.time} </div>
    </div>
        <div style={{margin:"8px 0px 0px 30px",fontWeight: "500", fontSize: "18px",color:"rgb(162 165 173)"}}> מרגיש כמו: {hour.feels_like}° </div>
      </div>
      </div>
    </div>
    );
}
  



