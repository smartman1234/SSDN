import Utils from "../utils/Utils";
export default class AssessmentCourseService {

	assessmentList(payload) {
		return Utils.sendApiRequest("assessments", "POST", true, payload)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				throw err;
			});
	}

	assessment(payload) {
		return Utils
			.sendApiRequest("assessment-list", "GET", true, payload)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				throw err;
			});
	}

	imageApi(payload) {
		return Utils
			.sendApiRequest("assessment-list", "post", true, payload)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				throw err;
			});
	}

	uniqueValues(payload) {
		return Utils
			.sendApiRequest("assessment-name-slug-unique", "POST", true, payload)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				throw err;
			});
	}

	getCourseDetails(dataId) {
		return Utils
			.sendApiRequest("assessments/" + dataId, "GET", true)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				throw err;
			});
	}

	deleteCourse(dataId) {
		return Utils.sendApiRequest("assessment-delete/" + dataId, "DELETE", true).then(
			(response) => {
				return response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	isfront(payload) {
		return Utils.sendApiRequest("assessment/change-front" , "POST", true,payload).then(
			(response) => {
				return response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

}
