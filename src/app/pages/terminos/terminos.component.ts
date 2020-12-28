import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
})
export class TerminosComponent implements OnInit {
  public politicas: any
  constructor(private modalctrl:ModalController) { }

  ngOnInit(
  ) {
    this.politicas= "POLÍTICA DE PRIVACIDAD\n1) Responsable de la base de datos\nEn cumplimiento de la Constitución de la República, lo establecido en la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos y demás normas ecuatorianas aplicables, se informa a los Usuarios de la presente página web, y a su vez éstos consienten expresamente que los datos de carácter personal facilitados a través de la presente página Web https://www.pizzahut.com.ec (en adelante, la página Web), sean incorporados a la base de datos denominada “USUARIOS WEB”, de responsabilidad de SODETUR S.A. (en adelante PIZZA HUT) con domicilio en Ecuador -excepto en el local de Manta COSTAHUT S.A.-, quien garantiza el pleno cumplimiento de la normativa vigente en materia de protección de datos de carácter personal en cada momento.\n\n2) Datos que podrán ser recopilados\nLa vista a esta página Web no supone que el usuario esté obligado a facilitar ninguna información sobre sí mismo. A través de los formularios de la página Web, los usuarios podrán voluntariamente entregar a PIZZA HUT única y exclusivamente aquellos datos necesarios para cumplir con las obligaciones contractuales y demás finalidades descritas en el siguiente punto. Por ejemplo, número de cédula, nombres y apellidos, dirección, edad, número de teléfono, correo electrónico, número de tarjeta de crédito/ débito, información de cuenta de pay-pal, entre otros. Bajo ningún concepto se solicitará al usuario suministrar datos de carácter sensibles.\n\n3) Finalidad del tratamiento de los datos personales\nPIZZA HUT informa a los Usuarios y éstos consienten expresamente que los datos personales que voluntariamente suministren a PIZZA HUT a través del formulario de registro y formulario de pago ubicado en la página Web sean tratados para cumplir con las obligaciones legales y contractuales asumidas frente a dichos Usuarios, en particular para gestionar el cobro y entrega de su pedido, así como para el envío de comunicaciones comerciales, incluso por medio de correo electrónico o medios electrónicos equivalentes tales como SMS en teléfonos móviles, sobre los productos y/o servicios ofrecidos por la cadena PIZZA HUT, así como por otras empresas afines a nuestras actividades y promociones (ocio, viajes, alimentación, telecomunicaciones, cultura y servicios) que colaboren ahora o en el futuro en las actividades o campañas promocionales que desarrolle PIZZA HUT, y otras empresas afines a nuestras actividades y promociones (ocio, viajes, alimentación, telecomunicaciones, cultura y servicios) que colaboren ahora o en el futuro en las actividades o campañas promocionales que desarrolle PIZZA HUT; así también para adecuar nuestras ofertas comerciales a sus preferencias, a partir del estudio y segmentación de la información personal y comercial que consta en nuestros ficheros como consecuencia de su acceso a la Web , incluso mediante encuestas especialmente dirigidas, tratándose no obstante los mismos en cualquier caso en la forma y con las limitaciones y derechos dentro del marco establecido por la legislación ecuatoriana.\n\nEn el momento de proceder a la recogida de los datos se indicará el carácter voluntario u obligatorio de los datos objeto de recogida. La negativa a proporcionar los datos calificados obligatorios supondrá la no prestación o la imposibilidad de acceder al servicio para los que eran solicitados.\n\n4) Cesión de datos del usuario\nEl Cliente o usuario queda informado y consiente expresamente que sus datos personales, facilitados a PIZZA HUT, puedan ser cedidos, exclusivamente para el cumplimiento de las finalidades descritas en el tercer punto, a otras empresas del Grupo y/o Cadena PIZZA HUT dentro del sector de la restauración, así como a otras empresas afines a nuestras actividades y promociones (ocio, viajes, alimentación, telecomunicaciones, cultura y servicios) que colaboren ahora o en el futuro en las actividades o campañas promocionales que desarrolle PIZZA HUT, aceptando por tanto expresamente el cliente o usuario que PIZZA HUT o las referidas sociedades, les remitan información sobre los productos que comercialicen. La aceptación del cliente o usuario para que puedan ser tratados o cedidos sus datos en la forma establecida en este párrafo, tiene siempre carácter revocable, sin efectos retroactivos, conforme a lo que dispone el artículo 9 de la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos.\n\n5) Responsabilidad del usuario\nSe prohíbe al Usuario incluir en los campos de texto libre de la página Web datos de carácter personal de terceras personas, así como datos personales relativos a ideología, afiliación sindical, religión, creencias, origen racial, salud y vida sexual. En el caso de que el Usuario incumpla esta obligación, responderá frente a PIZZA HUT y frente a los terceros de los daños y/o perjuicios que se pudiesen ocasionar con motivo del citado incumplimiento.\n\n\nEl acceso a los servicios, productos, contenidos o el registro en cualquiera de los formularios de solicitud de datos personales existentes en nuestra “webhome” se realizará bajo la más completa responsabilidad de los Usuarios. En caso de que se trate de menores de edad o incapaces, se realizará a la entera responsabilidad de sus padres, representantes o tutores legales, debiendo éstos en todo caso, acompañar, supervisar o tomar las precauciones oportunas durante la navegación de aquellos por las páginas web.\n\n\nIgualmente se informa por parte de PIZZA HUT, de la imposibilidad de realizar comprobaciones sobre la veracidad y exactitud de los datos personales proporcionados, por lo que recomienda para los casos de tales actuaciones que supervisen el proceso de registro de sus hijos o tutelados. En su caso, PIZZA HUT., gestionará las solicitudes derivadas del ejercicio, por los padres o tutores, de los derechos de acceso, cancelación, rectificación y oposición de los datos de los menores o incapaces, sin perjuicio de que puede ponerse en contacto con nosotros para realizar las advertencias que considere oportunas, por cualquiera de los medios ya referenciados.\n\n\nAsimismo, el Usuario se obliga a mantener indemne a PIZZA HUT frente a cualquier reclamación que pueda ser interpuesta contra éste por el incumplimiento por el Usuario de las obligaciones recogidas en la presente Política de Privacidad, así como en la legislación vigente en cada momento en materia de protección de datos personales y acepta satisfacer el importe al que, en concepto de sanción, multa, indemnización, daños, perjuicios e intereses pueda ser condenado PIZZA HUT, incluyendo honorarios de abogados, con motivo del citado incumplimiento.\n\n6) Derechos de acceso, rectificación, cancelación y oposición\nDe conformidad con lo establecido en las leyes aplicables, el cliente o usuario queda igualmente informado sobre la posibilidad de ejercer los derechos de acceso, rectificación, cancelación y oposición, en los términos establecidos en la legislación vigente, siendo PIZZA HUT el responsable del fichero automatizado y pudiendo dirigirse por escrito, al Departamento de atención al Cliente de PIZZA HUT o bien mediante correo electrónico a la siguiente dirección: contactoweb@pizzahut.com.ec\n\n7) Seguridad de los datos personales\nPIZZA HUT se compromete al cumplimiento de su obligación de secreto respecto de los datos de carácter personal de los Usuarios y de su deber de guardarlos, y adoptará las medidas de índole técnica y organizativas necesarias que garanticen la seguridad de los datos de carácter personal y eviten su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos, ya provengan de la acción humana o del medio físico o natural.\n\n8) Modificaciones de la política de tratamiento de datos personales\nPIZZA HUT se reserva el derecho a modificar, sin necesidad de previo aviso y en cualquier momento, el contenido de todos o algunos de los extremos recogidos en la presente Política de Privacidad con el fin de adecuarlos a la normativa vigente que sea de aplicación en cada momento o bien al funcionamiento o la incorporación de nuevos servicios. En caso de producirse la mencionada modificación, PIZZA HUT se compromete a publicar convenientemente en la página Web la Política de Privacidad modificada o actualizada de forma que esté a disposición de los Usuarios, así como de cualquier otra persona interesada.\n\nLos usuarios consienten que será de aplicación la última Política de Privacidad publicada en la Página web."
  }
  btnSi(){
    this.modalctrl.dismiss()
  }
}
