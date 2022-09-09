export default function Alert({color}) {
    const agregado='Se ha agregado el proyecto correctamente.';
    const enviado='Se esta enviando el proyecto.'; 
    return (
        <div className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${color ? 'bg-emerald-500' : 'bg-orange-500'}`}>
            <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell"></i>
            </span>
            <span className="inline-block align-middle mr-8">
                <b className="capitalize">Completado!</b> {color ? agregado : enviado}
            </span>
        </div>
    )
}
