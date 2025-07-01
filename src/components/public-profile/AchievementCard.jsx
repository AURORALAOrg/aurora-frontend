const AchievementCard = ({ achievement }) => {
  const rarityColors = {
    common: 'bg-[#212936] border-gray-700 text-gray-300',
    rare: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    epic: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    legendary: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  };

  return (
    <div className={`p-4 rounded-lg border border-gray-800 bg-gray-850 transition-all duration-200 hover:scale-105`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl">{achievement.icon}</div>
        <div className="flex-1 overflow-hidden  ">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-bold overflow-hidden text-ellipsis truncate w-full">{achievement.title}</h4>
            <span className={` px-2.5 py-0.5 text-xs font-bold rounded-full border 
              ${achievement.rarity === 'common' ? rarityColors.common :
                achievement.rarity === 'rare' ? rarityColors.rare :
                  achievement.rarity === 'epic' ? rarityColors.epic :
                    rarityColors.legendary}`}>
              {achievement.rarity}
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
          <p className="text-xs text-light-blue-1 font-medium">Unlocked {achievement.unlockedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard; 