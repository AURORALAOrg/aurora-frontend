import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getContinueLearningLesson, getDashboardData } from "@/data/mock-dashboard-data";
import { CircleCheck, Star } from "lucide-react";
import React from "react";

const TopCard = ({ title, description, stat }) => {
  return (
    <Card className="w-full">
      <div className="w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-t-lg"></div>
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <div></div>
        </div>
        <p className="text-2xl font-bold">{stat}</p>
        <div>
          <p className="text-[12px] text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const dashboardData = getDashboardData();
  const continueLearningLesson = getContinueLearningLesson();

  return (
    <div className="min-h-screen bg-dark-blue-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-neutral-3 mt-1">
                Your learning overview and next steps
              </p>
            </div>
          </div>
        </div>

        {/* Top cards Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full mb-5">
          <TopCard
            title="Total Points"
            description="Earn points by completing lessons and assessments"
            stat={dashboardData.gamification.pointsTotal}
          />
          <TopCard
            title="Streak"
            description="Come back every day to grow your streak"
            stat={dashboardData.gamification.streakCount}
          />
          <TopCard
            title="Overall Completion"
            description="Average across all areas"
            stat={`${dashboardData.gamification.overallCompletion}%`}
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-[70%] space-y-5">
            <Card className="flex pt-6">
              <CardContent className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 font-medium">
                    Continue where you left off
                  </p>
                  <p className="font-medium">{`${continueLearningLesson.title}`}</p>
                </div>
                <Button>Continue</Button>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Your Courses</h2>
                <a>Explore All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dashboardData?.lessons.map(
                  ({ title, percentComplete, nextLesson, status }) => (
                    <Card>
                      <img
                        src="https://placehold.co/400"
                        className="w-full h-44 object-cover rounded-t-lg"
                      />
                      <CardContent className="pt-4 flex flex-col gap-2">
                        <p className="font-semibold">{title}</p>
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">Progress</p>
                            <p className="text-sm font-semibold">{percentComplete}%</p>
                          </div>
                          <div>line</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-500 text-sm">
                            Next:{" "}
                            <span className="text-gray-800 font-medium">
                              {nextLesson.title}
                            </span>
                          </p>
                          <Button>{status}</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] flex flex-col md:flex-row lg:flex-col gap-3">
            <Card className="w-full">
              <CardContent className="pt-4">
                <h2 className="text-xl font-bold mb-3">Recommended for you</h2>
                <div className="flex flex-col gap-3">
                  {dashboardData?.recommendations.map(
                    ({ title, description, tag }) => (
                      <div className="flex gap-2">
                        <div className="w-16 h-12 rounded-md bg-gray-200">
                          {/* <img className="w-16 h-16 rounded-md"/> */}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{title}</p>
                              <div className="bg-blue-200 rounded-lg text-[10px] font-semibold px-1 py-[1px] w-fit">
                                {tag}
                              </div>
                            </div>
                            <Button>Start Learning</Button>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              {description}
                            </p>
                            <div className="flex flex-col">
                              <div>
                                <Star className="w-4 h-4 text-blue-500" />
                              </div>
                              <div>line</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="pt-4">
                <h2 className="text-xl font-bold mb-3">Recent Activity</h2>
                <div className="flex flex-col">
                  {dashboardData?.recentActivity.map(
                    ({ title, type, date, score }) => (
                      <div className="flex flex-col">
                        <div className="flex gap-2 w-full justify-between">
                          <div className="flex gap-2 items-start">
                            <CircleCheck className="w-4 h-4 mt-1 text-blue-500" />
                            <div>
                              <p className="text-sm font-semibold">{title}</p>
                              <div className="text-sm text-gray-500">
                                {type}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm font-bold">{score}%</p>
                        </div>
                        <hr className="my-4" />
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
