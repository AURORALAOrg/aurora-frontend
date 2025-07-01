const StatCard = ({ icon: Icon, title, value, color = "#00C2CB" }) => (
  <div className={`p-6 rounded-lg bg-[#192436] shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold mb-2 flex items-center gap-2">
          <Icon className="w-4 h-4 opacity-80 mb-[2px]" style={{ color: color }} />
          <span className='text-white'>{title}</span>
        </p>
        <h3 className={`text-2xl font-bold`} style={{ color: color }}>
          {value}
        </h3>
      </div>
    </div>
  </div>
);

export default StatCard; 