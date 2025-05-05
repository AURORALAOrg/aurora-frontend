const CategoryCard = ({ title, modules, color, icon, imageSrc }) => {
    return (
      <div className={`${color} rounded-xl overflow-hidden h-48 transition-transform hover:scale-105 cursor-pointer relative`}>
        <div className="p-6 h-full">
          <div className=" items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <div className="text-white">
                {icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <div className="mt-auto">
            <p className="text-white/80 text-sm">{modules} Modules</p>
          </div>
        </div>
        {/* Imagen en la esquina inferior derecha */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={`${title} Illustration`}
            className="absolute bottom-2 right-2 w-16 h-16 object-contain pointer-events-none"
          />
        )}
      </div>
    );
  };
  
  export default CategoryCard;
  