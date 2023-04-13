/*
This is a list of basic events that can be triggered by the user.
If any notification is unwanted, you can just remove it from the list.

Explanations of attributes:
    - title: Title of message
    - newDescription: Message when an item is added
    - changeDescription: Message when an item is changed
    - color (optional): Color of the message's sidebar
    - thumbnail (optional): Image url to a thumbnail that gets attached to the message
    - issueKey (optional): Property of issue that has been updated
    - nameKey (optional): Attribute of updated property
    - customCheck (optional, unless issueKey is not provided): Function that determines if this event was triggered
    - valueGetter (optional): Function that returns the value of the updated property
*/

const COLORS = require("./config_colors");

const EVENTS = [
    {
        title: "Stage Changed",
        newDescription: "Stage set to $newValue.",
        changeDescription: "Stage changed from $oldValue to $newValue.",
        issueKey: "Stage",
        nameKey: "name"
    },
    {
        title: "Card Moved",
        newDescription: "Card moved to $newValue.",
        changeDescription: "Card moved from $oldValue to $newValue.",
        issueKey: "Stage",
        nameKey: "name"
    },
    {
        title: "Assignee Changed",
        newDescription: "Assignee set to $newValue.",
        changeDescription: "Assignee changed from $oldValue to $newValue.",
        issueKey: "Assignee",
        nameKey: "visibleName"
    },
    {
        title: "Comment Added",
        newDescription: "$newValue",
        customCheck: function (issue) {
            // Only send message if comment was created rather than edited
            return issue.comments.isChanged && issue.comments.added.size >= 1;
        },
        valueGetter: function (issue) {
            // Get text of added comment
            return issue.comments.added.get(0).text;
        }
    },
    {
        title: "Priority Changed",
        newDescription: "The issue priority was set to $newValue.",
        changeDescription: "The issue priority was changed from $oldValue to $newValue.",
        issueKey: "Priority",
        nameKey: "name"
    },
    {
        title: "Issue Created",
        newDescription: "The issue with the ID $newValue was created.",
        customCheck: function (issue) {
            return issue.becomesReported;
        },
        valueGetter: function (issue) {
            return issue.id;
        }
    },
    {
        title: "Issue Resolved",
        newDescription: "The issue with the ID $newValue has been resolved.",
        color: COLORS.COLOR_POSITIVE,
        customCheck: function (issue) {
            return issue.becomesResolved;
        },
        valueGetter: function (issue) {
            return issue.id;
        }
    }
];

module.exports = { EVENTS };
