import {Request, Response} from "express";
import {CourseDocument} from "../models/course.model";
import {
	createCourse,
	deleteCourse, enrollCourse, finishCourse,
	getCourse,
	getCourses, getEnrolledCourses, getLecturesByCourse,
	getLessonsByLecture,
	updateCourse
} from "../services/course.service";


export async function handleCreateCourse(req: Request, res: Response) {
	try {
		const { title, description } = req.body;
		const photoPath = req.file ? req.file.path : '';
		const { id } = req.user!;

		const course = await createCourse(id, title, description, photoPath);

		res.status(201).json(course);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || "Internal Server Error");
	}
}

export async function handleGetCourse(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let resp = await getCourse(courseId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCourses(req: Request, res: Response) {
	try {
		let resp = await getCourses();
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCourseByUser(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let { id } = req.user!;
		let resp = await getCourse(courseId, id);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCoursesByUser(req: Request, res: Response) {
	try {
		let { id } = req.user!;
		let resp = await getCourses(id);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}


export async function handleUpdateCourse(req: Request, res: Response) {
	try {
		let { courseId} = req.params;
		let data: Partial<CourseDocument> = {
			...req.body
		}

		let resp = await updateCourse(courseId, data);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleDeleteCourse(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let resp = await deleteCourse(courseId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetLecturesByCourse(req: Request, res: Response) {
	try {
		let {courseId} = req.params;
		let resp = await getLecturesByCourse(courseId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e.message);
	}
}

export async function handleGetLessonsByLecture(req: Request, res: Response) {
	try {
		let { lectureId } = req.params;
		let resp = await getLessonsByLecture(lectureId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e.message);
	}
}

export async function handleEnrollCourse(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let userId = req.user!.id;

		let resp = await enrollCourse(courseId, userId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetEnrolledCourses(req: Request, res: Response) {
	try {
		let userId = req.user!.id;

		let resp = await getEnrolledCourses(userId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleFinishCourse(req: Request, res: Response) {
	try {
		let userId = req.user!.id;
		let { courseId } = req.params;

		let resp = await finishCourse(userId, courseId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}
