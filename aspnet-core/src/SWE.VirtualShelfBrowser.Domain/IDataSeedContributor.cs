using SWE.VirtualShelfBrowser.Authors;
using SWE.VirtualShelfBrowser.Books;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace SWE.VirtualShelfBrowser
{
    public class VirtualShelfBrowserSeederContributor:
        IDataSeedContributor, ITransientDependency
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly AuthorManager _authorManager;


        public VirtualShelfBrowserSeederContributor(
        IAuthorRepository authorRepository,
        AuthorManager authorManager)
        {
            _authorRepository = authorRepository;
            _authorManager = authorManager;
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
}
