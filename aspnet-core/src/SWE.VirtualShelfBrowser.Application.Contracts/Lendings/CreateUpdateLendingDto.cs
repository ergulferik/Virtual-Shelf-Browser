using System;
using System.ComponentModel.DataAnnotations;

namespace SWE.VirtualShelfBrowser.Lendings;

public class CreateUpdateLendingDto
{


    [DataType(DataType.Date)]
    public DateTime? StartDate { get; set; } = DateTime.Now;

    [DataType(DataType.Date)]
    public DateTime? EndDate { get; set; } = DateTime.Now;
    public Guid? BookId { get; set; }
    public Guid? UserId { get; set; }
    public string? UserName {  get; set; }
    public Guid? LenderId { get; set; }
    public string? LenderName { get; set;}
    public bool? IsDelivered { get; set; }
}
