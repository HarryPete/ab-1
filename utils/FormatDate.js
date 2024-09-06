const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const FormatDate = (date) =>
{
    return new Date(date).toLocaleDateString('en-US', options)
}