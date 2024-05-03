import { Physics } from "../../../../CoursesSource/Physics";
import { Chemistry } from "../../../../CoursesSource/Chemistry";
import { Biology } from "../../../../CoursesSource/Biology";
import { Mathematics } from "../../../../CoursesSource/Mathematics";
import { AIandCloudComputing } from "../../../../CoursesSource/AIandCloudComputing";
import { ITandSoftware } from "../../../../CoursesSource/ITandSoftware";

// Function to generate recommendations based on user's existing courses
export const generateRecommendations = (userCourses, setRecommendedCourses) => {
  const recommendations = [];
  const subjectCounts = {};

  // Count the number of courses for each subject
  userCourses.forEach((course) => {
    const subject = course.c_name;
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });

  const maxRecommendations = 12;

  // Iterate through each subject
  Object.keys(subjectCounts).forEach((subject) => {
    const coursesForSubject = getCourseArrayForSubject(subject);
    const maxCoursesToAdd = Math.min(3, coursesForSubject.length); // Add at most 3 courses per subject

    // Add random courses from this subject to recommendations
    for (let i = 0; i < maxCoursesToAdd; i++) {
      if (recommendations.length >= maxRecommendations) break; // Stop generating recommendations if the count reaches 12

      const randomIndex = Math.floor(Math.random() * coursesForSubject.length);
      const randomCourse = coursesForSubject[randomIndex];

      // Check if the course is not already in userCourses
      if (!userCourses.some((course) => course.id === randomCourse.id)) {
        recommendations.push(randomCourse);
      }

      // Remove the added course from the array to avoid duplicates
      coursesForSubject.splice(randomIndex, 1);
    }
  });

  // If still less than 12 recommendations, add more from remaining subjects
  if (recommendations.length < maxRecommendations) {
    const remainingCourses = getRemainingCourses(userCourses);
    let count = maxRecommendations - recommendations.length;
    let index = 0;

    while (count > 0 && index < remainingCourses.length) {
      recommendations.push(remainingCourses[index]);
      count--;
      index++;
    }
  }

  console.log(recommendations);
  setRecommendedCourses(recommendations);
};

// Function to get the remaining courses from all subjects
const getRemainingCourses = (userCourses) => {
  const allCourses = [
    ...Chemistry.Youtube,
    ...Chemistry.Udemy,
    ...Chemistry.Coursera,
    ...Chemistry.GeeksForGeeks,
    ...Physics.Youtube,
    ...Physics.Udemy,
    ...Physics.Coursera,
    ...Physics.GeeksForGeeks,
    ...Biology.Youtube,
    ...Biology.Udemy,
    ...Biology.Coursera,
    ...Biology.GeeksForGeeks,
    ...Mathematics.Youtube,
    ...Mathematics.Udemy,
    ...Mathematics.Coursera,
    ...Mathematics.GeeksForGeeks,
    ...ITandSoftware.Youtube,
    ...ITandSoftware.Udemy,
    ...ITandSoftware.Coursera,
    ...ITandSoftware.GeeksForGeeks,
    ...AIandCloudComputing.Youtube,
    ...AIandCloudComputing.Udemy,
    ...AIandCloudComputing.Coursera,
    ...AIandCloudComputing.GeeksForGeeks,
  ];

  const remainingCourses = allCourses.filter((course) => {
    return !userCourses.some((userCourse) => userCourse.id === course.id);
  });

  return remainingCourses;
};

// Function to get the course array for a particular subject
const getCourseArrayForSubject = (subject) => {
  switch (subject) {
    case "chemistry":
      return [
        ...Chemistry.Youtube,
        ...Chemistry.Udemy,
        ...Chemistry.Coursera,
        ...Chemistry.GeeksForGeeks,
      ];
    case "Physics":
      return [
        ...Physics.Youtube,
        ...Physics.Udemy,
        ...Physics.Coursera,
        ...Physics.GeeksForGeeks,
      ];
    case "Mathematics":
      return [
        ...Mathematics.Youtube,
        ...Mathematics.Udemy,
        ...Mathematics.Coursera,
        ...Mathematics.GeeksForGeeks,
      ];
    case "biology":
      return [
        ...Biology.Youtube,
        ...Biology.Udemy,
        ...Biology.Coursera,
        ...Biology.GeeksForGeeks,
      ];
    case "IT and Software":
      return [
        ...ITandSoftware.Youtube,
        ...ITandSoftware.Udemy,
        ...ITandSoftware.Coursera,
        ...ITandSoftware.GeeksForGeeks,
      ];
    case "AI and Cloud Computing":
      return [
        ...AIandCloudComputing.Youtube,
        ...AIandCloudComputing.Udemy,
        ...AIandCloudComputing.Coursera,
        ...AIandCloudComputing.GeeksForGeeks,
      ];
    default:
      return [];
  }
};
