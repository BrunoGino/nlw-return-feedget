import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackMock = jest.fn();
const sendMailMock = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackMock },
    { sendMail: sendMailMock }
);

describe('Submit feedback', () => {
    it('should submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,test.jpg'
        })).resolves.not.toThrow();

        expect(createFeedbackMock).toHaveBeenCalled();
        expect(sendMailMock).toHaveBeenCalled();
    });


    it('should not submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow();

        expect(createFeedbackMock).not.toHaveBeenCalled();
        expect(sendMailMock).not.toHaveBeenCalled();

    });

    it('should not submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow();

        expect(createFeedbackMock).not.toHaveBeenCalled();
        expect(sendMailMock).not.toHaveBeenCalled();
    });

    it('should not submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow();

        expect(createFeedbackMock).not.toHaveBeenCalled();
        expect(sendMailMock).not.toHaveBeenCalled();
    });

});