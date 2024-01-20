using System;

using Volo.Abp.Domain.Entities.Auditing;

namespace SWE.VirtualShelfBrowser.Lendings;

public class Lending : FullAuditedAggregateRoot<Guid>
{
    public Guid UserId { get; set; }
    public Guid LenderId { get; set; }
    public Guid BookId { get; set; }
    public string UserName { get; set; }
    public string LenderName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsDelivered { get; set; }

    public Lending()
    {
        /* This constructor is for deserialization / ORM purpose */
    }

    public Lending(
        Guid id,
        Guid userId,
        string userName,
        Guid lenderId,
        string lenderName,
        Guid bookId,
        DateTime startDate,
        DateTime endDate,
        bool isDelivered
        )
        : base(id)
    {
        UserId = userId;
        UserName = userName;
        LenderId = lenderId;
        LenderName = lenderName;
        BookId = bookId;
        StartDate = startDate;
        EndDate = endDate;
        IsDelivered = isDelivered;
    }
}
