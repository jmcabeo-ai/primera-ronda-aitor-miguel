"use strict";
(function(root){
  const finite=(value,min,max,name)=>{if(typeof value!=="number"||!Number.isFinite(value)||value<min||value>max)throw new Error("Revisa "+name+".");return value};
  function capacity({saving=0,extraAdmin=0,tax=0,filterCost=30}={}){
    finite(saving,0,150,"el ahorro");finite(extraAdmin,0,390,"el gasto administrativo extra");finite(tax,0,100,"el recargo");finite(filterCost,10,40,"el coste de descarte");
    const ads=390+saving-extraAdmin,filters=Math.max(0,ads-5-145),media=filters/(1+tax/100);
    return {ads,filters,media,count:Math.floor((media+1e-8)/filterCost),funded:ads>=150,total:1500};
  }
  function economics({price=49.9,product=14,shipping=4,cpa=11,incidents=3,vat=21}={}){
    finite(price,.01,10000,"el precio");for(const [n,v]of Object.entries({product,shipping,cpa,incidents}))finite(v,0,10000,n);finite(vat,0,100,"el IVA");
    const net=price/(1+vat/100),fee=price*.021+.30,before=net-product-shipping-fee-incidents,contribution=before-cpa;
    return {net,fee,before,contribution,breakRoas:before>0?price/before:null,roas:cpa>0?price/cpa:null};
  }
  function test({spend=30,clicks=60,atc=4,purchases=1,measured=true,funded=true,extended=false,after48=false,positive=true}={}){
    finite(spend,0,10000,"el gasto");for(const [n,v]of Object.entries({clicks,atc,purchases})){finite(v,0,100000,n);if(!Number.isInteger(v))throw new Error("Usa números enteros en clics, carritos y compras.")}
    const cpc=clicks?spend/clicks:null,rate=clicks?atc/clicks*100:null;
    const result=(key,title,reason)=>({key,title,reason,cpc,rate});
    if(!measured)return result("review","Primero: arreglar la medición","Sin eventos comprobados no sabemos si faltan carritos o si falta el contador. No se concluye que el producto no interese.");
    if((atc||purchases)&&!clicks)return result("review","Revisar el ejemplo","Hay carritos o compras pero cero clics. Comprueba fuentes, periodo y atribución antes de decidir.");
    if(after48)return positive?result("review","Revisar rentabilidad y caja","La continuidad acabó con contribución positiva en este ejemplo. Aún hay que descontar gastos fijos e incidencias y revisar dos días con ≥15% antes de plantear una subida."):result("stop","Parar tras las 48 horas","La regla C33 corta si no hay beneficio después de la continuidad. Guarda costes, pedidos y saldo; no prolongues por esperanza.");
    if(spend>=10&&(cpc===null||cpc>1))return result("stop","Parar: el clic sale caro","Con al menos 10 € gastados, un CPC superior a 1 € activa el corte del curso. Con cero clics, revisar entrega y anuncio antes de gastar más.");
    if(spend>20&&atc===0)return result("stop","Parar: no hay carritos","Se han superado 20 € sin ningún añadido al carrito. La regla C33 pide cortar.");
    const cap=extended?40:30;
    if(spend>=cap&&purchases===0)return result("stop","Parar: no hay venta","Se alcanzó el límite de "+cap+" € sin una compra pagada. 30 € es nuestro corte normal; llegar a 40 € exige una razón documentada.");
    if(purchases>=1&&cpc!==null&&cpc<.70&&rate>=5)return funded?result("continue","Señales para continuar 48 horas","Hay compra pagada, CPC menor de 0,70 € y carritos ≥5%. Se puede reservar una ventana de 48 h; esto no convierte al producto en ganador."):result("review","Señales buenas, pero falta caja","La regla da señales para continuar, pero no hay dinero disponible para financiar la ventana completa. No se abre sin resolverlo.");
    if(purchases>=1)return result("review","Una venta todavía no basta","No se cumplen juntas las condiciones de continuidad de C33. Revisa margen y límites; una venta no justifica seguir gastando automáticamente.");
    return result("review","Observar hasta el siguiente límite","Todavía no se activó un corte ni hay señales de continuidad. Vigila el gasto con frecuencia; 50 €/día es presupuesto configurado, no obligación de gastar 50 €.");
  }
  const api={capacity,economics,test};if(typeof module!=="undefined"&&module.exports)module.exports=api;else root.PilotMath=api;
})(typeof window!=="undefined"?window:globalThis);
