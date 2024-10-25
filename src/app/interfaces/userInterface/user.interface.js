// Datos de ejemplo
var user = {
    dataUser: {
        nombre: "Juan",
        apellido: "Perez",
        edad: 28,
        genero: "masculino",
        peso: 75,
        altura: 175
    },
    dataUserNutricional: {
        perfil: "volumen",
        tmb: 1750,
        tdee: 2400,
        nivelActividad: "moderado",
        caloriasObjetivo: 2880,
        macronutrientes: {
            proteinas: 144,
            carbohidratos: 360,
            grasas: 80
        }
    }
};
// Clase para manejar los cálculos nutricionales
var Nutricion = /** @class */ (function () {
    function Nutricion(user) {
        this.user = user;
    }
    // Método para calcular el TMB
    Nutricion.prototype.calcularTMB = function () {
        var _a = this.user.dataUser, peso = _a.peso, altura = _a.altura, edad = _a.edad, genero = _a.genero;
        var tmb;
        // Fórmula de Mifflin-St Joer para TMB
        if (genero === "masculino") {
            tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
        }
        else {
            tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
        }
        this.user.dataUserNutricional.tmb = tmb;
        return tmb;
    };
    // Método para calcular el TDEE
    Nutricion.prototype.calcularTDEE = function () {
        var tmb = this.user.dataUserNutricional.tmb;
        var nivelActividad = this.user.dataUserNutricional.nivelActividad;
        var factorActividad;
        // Definir el factor de actividad basado en el nivel de actividad
        switch (nivelActividad) {
            case "sedentario":
                factorActividad = 1.2;
                break;
            case "ligero":
                factorActividad = 1.375;
                break;
            case "moderado":
                factorActividad = 1.55;
                break;
            case "activo":
                factorActividad = 1.725;
                break;
            default:
                factorActividad = 1.2; // Por defecto a sedentario
                break;
        }
        var tdee = tmb * factorActividad;
        this.user.dataUserNutricional.tdee = tdee;
        return tdee;
    };
    // Método para calcular las calorías objetivo
    Nutricion.prototype.calcularCaloriasObjetivo = function () {
        var tdee = this.user.dataUserNutricional.tdee;
        var perfil = this.user.dataUserNutricional.perfil;
        var caloriasObjetivo;
        // Ajustar las calorías según el perfil
        if (perfil === "volumen") {
            caloriasObjetivo = tdee * 1.1; // Superávit del 10%
        }
        else {
            caloriasObjetivo = tdee * 0.9; // Déficit del 10%
        }
        this.user.dataUserNutricional.caloriasObjetivo = caloriasObjetivo;
        return caloriasObjetivo;
    };
    // Método para calcular los macronutrientes sugeridos
    Nutricion.prototype.calcularMacronutrientes = function () {
        var caloriasObjetivo = this.user.dataUserNutricional.caloriasObjetivo;
        // Fijar valores para el cálculo de macronutrientes
        var gramosProteinas = 1.925 * this.user.dataUser.peso; // en gramos
        var caloriasProteinas = gramosProteinas * 4; // 1 gramo de proteína = 4 calorías
        var gramosGrasas = (caloriasObjetivo * 0.25) / 9; // 1 gramo de grasa = 9 calorías
        var caloriasGrasas = gramosGrasas * 9; // Calorías de grasas
        var caloriasRestantes = caloriasObjetivo - (caloriasProteinas + caloriasGrasas);
        var gramosCarbohidratos = caloriasRestantes / 4; // 1 gramo de carbohidrato = 4 calorías
        // Asignar los valores calculados a la estructura de datos
        this.user.dataUserNutricional.macronutrientes.proteinas = Math.round(gramosProteinas);
        this.user.dataUserNutricional.macronutrientes.grasas = Math.round(gramosGrasas);
        this.user.dataUserNutricional.macronutrientes.carbohidratos = Math.round(gramosCarbohidratos);
    };
    return Nutricion;
}());
// Ejemplo de uso
var nutricion = new Nutricion(user);
nutricion.calcularTMB();
nutricion.calcularTDEE();
nutricion.calcularCaloriasObjetivo();
nutricion.calcularMacronutrientes();
console.log(user);
console.log(nutricion.calcularTMB());



// Pasos para correr un archivo TS por consola 

// 1) Instalar TS 
// ndp install -g typescript

// 2) crear el proyecto en TS

// 3) Compilar TS a JS
//     tss <nombredelarchivo.ts>

// 4) Ejecutar codigo JS
//     node <nombredelarchivo>