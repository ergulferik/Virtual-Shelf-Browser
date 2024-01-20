using System;
using System.Threading.Tasks;
using Shouldly;
using Volo.Abp.Data;
using Xunit;

namespace SWE.VirtualShelfBrowser.Authors;


public class AuthorAppService_Tests : VirtualShelfBrowserApplicationTestBase, IDataSeedContributor
{
    private readonly IAuthorRepository _authorRepository;
    private readonly AuthorManager _authorManager;
    private readonly IAuthorAppService _authorAppService;

    public AuthorAppService_Tests()
    {
        _authorAppService = GetRequiredService<IAuthorAppService>();
    }

    [Fact]
    public async Task Should_Get_All_Authors_Without_Any_Filter()
    {
        var result = await _authorAppService.GetListAsync(new GetAuthorListDto());

        result.TotalCount.ShouldBeGreaterThanOrEqualTo(2);
        result.Items.ShouldContain(author => author.Name == "George Orwells");
        result.Items.ShouldContain(author => author.Name == "Douglas Adamss");
    }

    [Fact]
    public async Task Should_Get_Filtered_Authors()
    {
        var result = await _authorAppService.GetListAsync(
            new GetAuthorListDto { Filter = "George" });

        result.TotalCount.ShouldBeGreaterThanOrEqualTo(1);
        result.Items.ShouldContain(author => author.Name == "George Orwells");
        result.Items.ShouldNotContain(author => author.Name == "Douglas Adamss");
    }

    [Fact]
    public async Task Should_Create_A_New_Author()
    {
        var authorDto = await _authorAppService.CreateAsync(
            new CreateAuthorDto
            {
                Name = "Edward Bellamy",
                BirthDate = new DateTime(1850, 05, 22),
                ShortBio = "Edward Bellamy was an American author..."
            }
        );

        authorDto.Id.ShouldNotBe(Guid.Empty);
        authorDto.Name.ShouldBe("Edward Bellamy");
    }

    [Fact]
    public async Task Should_Not_Allow_To_Create_Duplicate_Author()
    {
        await Assert.ThrowsAsync<AuthorAlreadyExistsException>(async () =>
        {
            await _authorAppService.CreateAsync(
                new CreateAuthorDto
                {
                    Name = "Douglas Adamss",
                    BirthDate = DateTime.Now,
                    ShortBio = "..."
                }
            );
        });
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        var orwell = await _authorRepository.InsertAsync(
               await _authorManager.CreateAsync(
                   "George Orwells",
                   new DateTime(1903, 06, 25),
                   "Orwell produced literary criticism and poetry, fiction and polemical journalism; and is best known for the allegorical novella Animal Farm (1945) and the dystopian novel Nineteen Eighty-Four (1949)."
               )
           );

        var douglas = await _authorRepository.InsertAsync(
            await _authorManager.CreateAsync(
                "Douglas Adamss",
                new DateTime(1952, 03, 11),
                "Douglas Adams was an English author, screenwriter, essayist, humorist, satirist and dramatist. Adams was an advocate for environmentalism and conservation, a lover of fast cars, technological innovation and the Apple Macintosh, and a self-proclaimed 'radical atheist'."
            )
        );
    }

    
}
